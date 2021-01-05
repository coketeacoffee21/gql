function newLinkSubscribe(parent, args, context, info) {
    console.log("newlinksub");
    return context.pubsub.asyncIterator("NEW_LINK")
  }
  
  const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => {
      console.log("resolved");
      return payload
    },
  }
  
  module.exports = {
    newLink,
  }