async function post(parent, args, context, info) {
  // const userId = getUserId(context)

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      // postedBy: { connect: { id: userId } },
    }
  })
  console.log("publish");
  context.pubsub.publish("NEW_LINK", newLink)

  return newLink
}

module.exports = {
  post,
}