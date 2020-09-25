import { Task } from "@prisma/client";

function taskHoursSum(tasks: Task[]) {
    return tasks.reduce((sum, task) => sum + task.hours, 0);
}

module.exports = {
    tasks: async (parent, args, context) => {
        return await context.prisma.task.findMany();
    },

    hoursByEmployee: async (parent, args, context) => {
        let tasks = await context.prisma.task.findMany({
            where: {
                employeeId: Number(args.employee)
            }
        });

        return taskHoursSum(tasks);
    },

    hoursByEmployeeAndTaskType: async (parent, args, context) => {
        let tasks = await context.prisma.task.findMany({
            where: {
                employeeId: Number(args.employee),
                typeId: Number(args.type)
            }
        });

        return taskHoursSum(tasks);
    },

    hoursByTaskType: async (parent, args, context) => {
        let tasks = await context.prisma.task.findMany({
            where: {
                typeId: Number(args.type)
            }
        });

        return taskHoursSum(tasks);
    }
};