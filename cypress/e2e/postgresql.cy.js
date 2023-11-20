/// <reference types="cypress"/>
describe('PostgreSQL', () => {
  beforeEach(()=> {
    //DELETE
    cy.runSQL("DELETE FROM employee_data WHERE name='john';")
      .then(()=> {
        cy.log('Table row deleted')
      })
    
      cy.runSQL("SELECT * FROM employee_data WHERE name='john';")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(0)
      })
  })

  it('queries on the "employee_data" table', () => {

    cy.runSQL('SELECT * FROM employee_data;')
    .then(queryResponse => {

      expect(queryResponse.length).to.equal(1)

      const {name, age, designation, salary} = queryResponse[0]

      expect(name).to.equal('mary')
      expect(age).to.equal(30)
      expect(designation).to.equal('ceo')
      expect(salary).to.equal(50000)
    })
    
  })

  it('INSERT, SELECT, UPDATE AND DELETE into/from the `employee_data` table', ()=> {
    //INSERT
    cy.runSQL("INSERT INTO employee_data (name, age, designation, salary) VALUES ('john', 27, 'engineer', 9000);")

    //SELECT
    cy.runSQL("SELECT * FROM employee_data;")
      .then(queryResponse=> {
        expect(queryResponse.length).to.equal(2)
      })

    cy.runSQL("SELECT * FROM employee_data WHERE name='john';")
      .then(queryResponse => {
  
        expect(queryResponse.length).to.equal(1)
  
        const {name, age, designation, salary} = queryResponse[0]
  
        expect(name).to.equal('john')
        expect(age).to.equal(27)
        expect(designation).to.equal('engineer')
        expect(salary).to.equal(9000)
      })

    // UPDATE
    cy.runSQL("UPDATE employee_data SET designation = 'ENGINEER' WHERE name='john';")

    // SELECT
    cy.runSQL("SELECT * FROM employee_data WHERE name='john';")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(1)

        const { designation } = queryResponse[0]

        expect(designation).to.equal('ENGINEER')
      })

  })

})