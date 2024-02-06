const Promise = require('bluebird')
const _ = require('lodash')
const { Enrollees, Users, UserProfiles, TextMessages } = require('../../models')
const { Op } = require('sequelize')
const sendSms = require('./sendSms')
const e = require('express')

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    async function doQueue() {
      const audience = _.has(payload, 'audience') ? payload.audience : []
      const message = _.has(payload, 'message') ? payload.message : null
      const createdBy = _.has(context, 'id') ? context.id : null

      let recepients = []

      if (!audience.length) {
        let all = await getAll()
        recepients = [...recepients, ...all]
      } else {
        await Promise.mapSeries(audience, async (roleCode) => {
          // switch (roleCode) {
          //   case 'STUDENT':
          //     let students = await getStudents()
          //     recepients = [...recepients, ...students]
          //     break
          //   default:
          //     let users = await getUserByRoleCode(roleCode)
          //     recepients = [...recepients, ...users]
          // }

          let users = await getUserByRoleCode(roleCode)
          recepients = [...recepients, ...users]

          return recepients
        })
      }

      const sent = await Promise.mapSeries(recepients, async (recepient) => {
        const mobile = _.has(recepient, 'mobile') ? recepient.mobile : null
        const to = `+${parseInt(mobile)}`
        const payload = { to, body: message }

        return sendSms(__, payload)
      })

      return {
        audience,
        message,
        recipients: _.map(recepients, (i) => ({
          id: i.id,
          userId: i.userId,
          firstName: i.firstName,
          lastName: i.lastName,
          roleCode: i.user.roleCode
        })),
        createdBy
      }
    }

    try {
      return doQueue().then(saveTextMessages).then(resolve)
    } catch (err) {
      reject(err)
    }
  })

const getStudents = () => {
  return new Promise((resolve, reject) => {
    return UserProfiles.findAll({
      where: {
        mobile: { [Op.not]: null }
      },
      include: [
        {
          model: Users,
          as: 'user',
          required: true,
          where: {
            status: { [Op.eq]: 'ACTIVE' }
          },
          include: [
            {
              model: Enrollees,
              as: 'enrollment',
              required: true
            }
          ]
        }
      ]
    })
      .then((result) => result && result.map((i) => i.toJSON()))
      .then(resolve)
      .catch(reject)
  })
}

const getUserByRoleCode = (roleCode) => {
  return new Promise((resolve, reject) => {
    return UserProfiles.findAll({
      where: {
        mobile: { [Op.not]: null }
      },
      include: [
        {
          model: Users,
          as: 'user',
          required: true,
          where: {
            roleCode: { [Op.eq]: roleCode },
            status: { [Op.eq]: 'ACTIVE' }
          }
        }
      ]
    })
      .then((result) => result && result.map((i) => i.toJSON()))
      .then(resolve)
      .catch(reject)
  })
}

const getAll = () => {
  return new Promise((resolve, reject) => {
    return UserProfiles.findAll({
      where: {
        mobile: { [Op.not]: null }
      },
      include: [
        {
          model: Users,
          as: 'user',
          required: true,
          where: {
            status: { [Op.eq]: 'ACTIVE' }
          }
        }
      ]
    })
      .then((result) => result && result.map((i) => i.toJSON()))
      .then(resolve)
      .catch(reject)
  })
}

const saveTextMessages = (payload) => {
  return new Promise((resolve, reject) => {
    return TextMessages.create({ ...payload })
      .then(resolve)
      .catch(reject)
  })
}
