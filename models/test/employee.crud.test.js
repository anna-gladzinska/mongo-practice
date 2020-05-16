const Employee = require('../employee.model.js');
const expect = require('chai').expect;

describe('Employee', () => {

    describe('Reading data', () => {

        before(async () => {
            const testEmpOne = new Employee({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            });
            await testEmpOne.save();

            const testEmpTwo = new Employee({
                firstName: 'Tadeusz',
                lastName: 'Nowak',
                department: 'Managment'
            });
            await testEmpTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return a proper document by "firstName, lastName, department" with "findOne" method', async () => {
            const employee = await Employee.findOne({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            });
            const expectedData = {
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            };
            expect(employee.firstName).to.be.equal(expectedData.firstName);
            expect(employee.lastName).to.be.equal(expectedData.lastName);
            expect(employee.department).to.be.equal(expectedData.department);
        });

        after(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

        after(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Updating data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            });
            await testEmpOne.save();

            const testEmpTwo = new Employee({
                firstName: 'Tadeusz',
                lastName: 'Nowak',
                department: 'Managment'
            });
            await testEmpTwo.save();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            }, {
                $set: {
                    firstName: '=Jan=',
                    lastName: '=Kowalski=',
                    department: '=IT='
                }
            });
            const updatedEmployee = await Employee.findOne({
                firstName: '=Jan=',
                lastName: '=Kowalski=',
                department: '=IT='
            });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            });
            employee.firstName = '=Jan=';
            employee.lastName = '=Kowalski=';
            employee.department = '=IT=';
            await employee.save();

            const updatedEmployee = await Employee.findOne({
                firstName: '=Jan=',
                lastName: '=Kowalski=',
                department: '=IT='
            });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, {
                $set: {
                    firstName: 'Updated!',
                    lastName: 'Updated!',
                    department: 'Updated!'
                }
            });
            const employees = await Employee.find({
                firstName: 'Updated!',
                lastName: 'Updated!',
                department: 'Updated!'
            });
            expect(employees.length).to.be.equal(2);
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Removing data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            });
            await testEmpOne.save();

            const testEmpTwo = new Employee({
                firstName: 'Tadeusz',
                lastName: 'Nowak',
                department: 'Managment'
            });
            await testEmpTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            });
            const removeEmployee = await Employee.findOne({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            });
            expect(removeEmployee).to.be.null;
        });

        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            });
            await employee.remove();
            const removedEmployee = await Employee.findOne({
                firstName: 'Jan',
                lastName: 'Kowalski',
                department: 'IT'
            });
            expect(removedEmployee).to.be.null;
        });

        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        });

    });

});