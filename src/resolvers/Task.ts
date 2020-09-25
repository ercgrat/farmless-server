module.exports = {
    employee: async (parent, args, context) => {
        return await context.prisma.task.findOne({
            where: {
                id: parent.id
            }
        }).employee();
    },
    type: async (parent, args, context) => {
        return await context.prisma.task.findOne({
            where: {
                id: parent.id
            }
        }).type()
    },
    enterprise: async (parent, args, context) => {
        return await context.prisma.task.findOne({
            where: {
                id: parent.id
            }
        }).enterprise();
    }
};