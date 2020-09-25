import { Employee, Enterprise, TaskType } from "@prisma/client";

module.exports = {
    post: async (parent, args, context, info) => {
        const newTasks = [];
        if (args.tasks && args.enterprise) {
            
            let enterprise: Enterprise = await context.prisma.enterprise.findOne({
                where: {
                    name: args.enterprise
                }
            });
            if (!enterprise) {
                enterprise = await context.prisma.enterprise.create({
                    data: {
                        name: args.enterprise
                    }
                });
            }

            for (let task of args.tasks) {
                let taskType: TaskType = await context.prisma.taskType.findOne({
                    where: {
                        name: task.type
                    }
                });
                if (!taskType) {
                    taskType = await context.prisma.taskType.create({
                        data: {
                            name: task.type
                        }
                    });
                }

                let employee: Employee = await context.prisma.employee.findOne({
                    where: {
                        name: task.employee
                    }
                });
                if (!employee) {
                    employee = await context.prisma.employee.create({
                        data: {
                            name: task.employee
                        }
                    });
                }

                const newTask = await context.prisma.task.create({
                    data: {
                        date: task.date,
                        employee: { connect: { id: employee.id } },
                        type: { connect: { id: taskType.id } },
                        enterprise: { connect: { id: enterprise.id } },
                        hours: task.hours,
                        tractorHours: task.tractorHours
                    }
                });
                newTasks.push(newTask);
            }
        }
        
        return newTasks;
    },

    resetDatabase: async (parent, args, context) => {
        await context.prisma.task.deleteMany();
        await context.prisma.employee.deleteMany();
        await context.prisma.enterprise.deleteMany();
        await context.prisma.taskType.deleteMany();
        return true;
    }
};