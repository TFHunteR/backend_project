const Promise = require('bluebird')
const {
  EnrolleeFiles,
  sequelize,
  Payments,
  Enrollees
} = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const uploadFile = require('../Uploads/uploadFile')

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    const createdBy = _.has(context, 'id') ? context.id : null

    async function doSave() {
      const referenceId = _.has(payload, 'referenceId')
        ? payload.referenceId
        : null
      const others = _.has(payload, 'others') ? payload.others : null
      const files = _.has(payload, 'files') ? payload.files : null
      const amount = _.has(payload, 'amount')
        ? parseFloat(payload.amount)
        : null

      const t = await sequelize.transaction()

      try {
        // get enrollment details
        const enrollment = await Enrollees.findOne({
          where: { id: referenceId }
        }).then((result) => result.toJSON())
        const paymentType = _.has(enrollment, 'paymentType')
          ? enrollment.paymentType
          : null

        // payment
        const paymentInst = await Payments.create(
          {
            type: 'ENROLLMENT',
            referenceId,
            paymentType: paymentType || 'FULL',
            amount,
            others,
            status: 'ACCEPTED',
            createdBy
          },
          { transaction: t }
        ).catch((err) => {
          const error = sequelizeHelper.extractError(err)

          throw error
        })

        // upload file attachments
        await Promise.map(files, (file) => {
          return uploadFile(__, { file, transaction: t }, { ...context }).then(
            (result) => {
              const fileResult = result && result.toJSON()
              const fileId = _.has(fileResult, 'id') ? fileResult.id : null

              // associate files to enrollment
              return EnrolleeFiles.create(
                { enrolleeId: referenceId, fileId, createdBy },
                { transaction: t }
              ).catch((err) => {
                const error = sequelizeHelper.extractError(err)

                throw error
              })
            }
          )
        })

        await t.commit()

        return paymentInst
      } catch (err) {
        await t.rollback()
        throw err
      }
    }

    return doSave().then(resolve).catch(reject)
  })
