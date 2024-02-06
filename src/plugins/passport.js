const { Plugin } = require('graphql-yoga')

module.exports = function usePassport() {
  return {
    onRequest({ request, serverContext, onRequestParse, endResponse }) {
      const { req } = serverContext
      // console.log({ plugauth: req.isAuthenticated(), onRequestParse })
      // if not login return 401 error here
      // if (!request.headers.get('authorization')) {
      //   endResponse(
      //     new fetchAPI.Response(
      //       null,
      //       {
      //         status: 401,
      //         headers: {
      //           'Content-Type': 'application/json'
      //         }
      //       }
      //     )
      //   )
      // }

      request.isAuthenticated = req.isAuthenticated
    }
  }
}