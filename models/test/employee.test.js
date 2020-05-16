const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if no "firstName, lastName, department" arg', () => {
        const emp = new Employee({});

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });

    });

    it('should throw an error if "firstName, lastName, department" is not a string', () => {

        const cases = [{},
            []
        ];

        for (let {
                firstName,
                lastName,
                department
            } of cases) {
            const emp = new Employee({
                firstName,
                lastName,
                department
            });

            emp.validate(err => {
                expect(err.errors.firstName).to.exist;
                expect(err.errors.lastName).to.exist;
                expect(err.errors.department).to.exist;
            });

        }

    });

    it('should not throw an error if "firstName, lastName, department" is okay', () => {

        const cases = [{
            firstName: 'Jan',
            lastName: 'Kowalski',
            department: 'IT'
        }, {
            firstName: 'Tadeusz',
            lastName: 'Nowak',
            department: 'Managment'
        }];

        for (let {
                firstName,
                lastName,
                department
            } of cases) {
            const emp = new Employee({
                firstName,
                lastName,
                department
            });

            emp.validate(err => {
                expect(err).to.not.exist;
            });

        }

    });

});

after(() => {
    mongoose.models = {};
});