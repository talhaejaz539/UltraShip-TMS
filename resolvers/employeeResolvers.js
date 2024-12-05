const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    employees: async (_, { page, limit, sortField, sortOrder, filter }) => {
      const skip = (page - 1) * limit;
      const sortOrderVal = sortOrder === 'ASC' ? 1 : -1;
      const filterConditions = {};

      if (filter) {
        if (filter.name) filterConditions.name = { $regex: filter.name, $options: 'i' };
        if (filter.class) filterConditions.class = { $regex: filter.class, $options: 'i' };
        if (filter.age) filterConditions.age = filter.age;
      }

      return await Employee.find(filterConditions)
        .skip(skip)
        .limit(limit)
        .sort({ [sortField]: sortOrderVal });
    },
    employee: async (_, { id }) => {
      return await Employee.findById(id);
    },
  },
  Mutation: {
    addEmployee: async (_, { name, age, class: employeeClass, subjects, attendance }) => {
      const employee = new Employee({ name, age, class: employeeClass, subjects, attendance });
      await employee.save();
      return employee;
    },
    updateEmployee: async (_, { id, name, age, class: employeeClass, subjects, attendance }) => {
      const employee = await Employee.findById(id);
      if (employee) {
        if (name) employee.name = name;
        if (age) employee.age = age;
        if (employeeClass) employee.class = employeeClass;
        if (subjects) employee.subjects = subjects;
        if (attendance) employee.attendance = attendance;
        await employee.save();
        return employee;
      }
      throw new Error('Employee not found');
    },
  },
};

module.exports = resolvers;
