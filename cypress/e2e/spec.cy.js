describe('Todo List Chrome Extension', () => {
  beforeEach(() => {
    cy.visit('popup.html')
  })

  describe('Adding tasks', () => {
    it('Should add a task to list', () => {
      cy.get('#new-task').type('finish testing')
      cy.get('#new-task').should('have.value', 'finish testing')
      cy.get('#add-button').click()
      cy.get('#tasks-list').children().should('have.length', 1)
      cy.get('.editable').should('have.text', 'finish testing')
    })

    it('should add a task when enter is pressed', () => {
      cy.get('#new-task').type('write more tests{enter}')
      cy.get('#tasks-list').children().should('have.length', 1)
      cy.get('.editable').should('have.text', 'write more tests')
      cy.get('#new-task').type('write more and more tests{enter}')
      cy.get('#tasks-list').children().should('have.length', 2)
      cy.get('.editable').eq(1).should('have.text', 'write more and more tests')
    })

    it('should add multiple tasks sequentially', () => {
      // enter task 1
      cy.get('#new-task').type('task 1{enter}')
      // click add button on task 2
      cy.get('#new-task').type('task 2')
      cy.get('#new-task').should('have.value', 'task 2')
      cy.get('#add-button').click()
      // enter task 3
      cy.get('#new-task').type('do maths hw pages 2-3{enter}')
      // click add button on task 4
      cy.get('#new-task').type('go to gym')
      cy.get('#new-task').should('have.value', 'go to gym')
      cy.get('#add-button').click()
      cy.get('#tasks-list').children().should('have.length', 4)
      cy.get('.editable').eq(0).should('have.text', 'task 1')
      cy.get('.editable').eq(1).should('have.text', 'task 2')
      cy.get('.editable').eq(2).should('have.text', 'do maths hw pages 2-3')
      cy.get('.editable').eq(3).should('have.text', 'go to gym')
    })
  })

  describe('Deleting tasks', () => {
    it('should delete a task from the list when delete button is clicked', () => {
      cy.get('#new-task').type('write more tests{enter}')
      cy.get('#tasks-list').children().should('have.length', 1)
      cy.get('.editable').eq(0).should('have.text', 'write more tests')
      cy.get('.delete-buttons').click()
      cy.get('#tasks-list').children().should('have.length', 0)
    })

    it('should delete desired tasks from list', () => {
      // enter task 1
      cy.get('#new-task').type('task 1{enter}')
      // click add button on task 2
      cy.get('#new-task').type('task 2')
      cy.get('#new-task').should('have.value', 'task 2')
      cy.get('#add-button').click()
      // enter task 3
      cy.get('#new-task').type('do maths hw pages 2-3{enter}')
      // click add button on task 4
      cy.get('#new-task').type('go to gym')
      cy.get('#new-task').should('have.value', 'go to gym')
      cy.get('#add-button').click()
      // enter task 5
      cy.get('#new-task').type('complete delete tests{enter}')
      // delete task 2 and 4
      cy.get('.delete-buttons').eq(1).click()
      cy.get('.delete-buttons').eq(2).click()
      // should have 3 tasks left
      cy.get('#tasks-list').children().should('have.length', 3)
      // check correct tasks were deleted
      cy.get('.editable').eq(0).should('have.text', 'task 1')
      cy.get('.editable').eq(1).should('have.text', 'do maths hw pages 2-3')
      cy.get('.editable').eq(2).should('have.text', 'complete delete tests')
    })
  })

  describe('Completing tasks', () => {
    it('should strikethrough text when checkbox is clicked', () => {
      cy.get('#new-task').type('task 1{enter}')
      cy.get('#new-task').type('task 2{enter}')
      // check first task
      cy.get('input').eq(1).check()
      cy.get('.editable').eq(0).should('have.css', 'text-decoration-line', 'line-through')
      // check 2nd task
      cy.get('input').eq(2).check()
      cy.get('.editable').eq(1).should('have.css', 'text-decoration-line', 'line-through')
    })

    it('should remove strikethrough text when checkbox is clicked again', () => {
      cy.get('#new-task').type('task 1{enter}')
      cy.get('#new-task').type('task 2{enter}')
      // check first task
      cy.get('input').eq(1).check()
      cy.get('.editable').eq(0).should('have.css', 'text-decoration-line', 'line-through')
      // check 2nd task
      cy.get('input').eq(2).check()
      cy.get('.editable').eq(1).should('have.css', 'text-decoration-line', 'line-through')
      cy.get('input').eq(1).uncheck()
      cy.get('.editable').eq(0).should('have.css', 'text-decoration-line', 'none')
      cy.get('input').eq(2).uncheck()
      cy.get('.editable').eq(1).should('have.css', 'text-decoration-line', 'none')
    })
  })

  describe('Editing tasks', () => {
    it('should ensure edited tasks are saved', () => {
      cy.get('#new-task').type('task 1{enter}')
      cy.get('#new-task').type('task 2{enter}')
      cy.get('#new-task').type('task 3{enter}')
      cy.get('.editable').eq(0).click().type('{backspace}532')
      cy.get('.editable').eq(1).click().type('{selectAll}{backspace}feed cat')
      cy.get('.editable').eq(2).click().type('{leftArrow}1')
      cy.get('.editable').eq(0).should('have.text', 'task 532')
      cy.get('.editable').eq(1).should('have.text', 'feed cat')
      cy.get('.editable').eq(2).should('have.text', 'task 13')
    })
  })
})

describe('Test data persistence from local storage', () => {
  beforeEach(() => {
    // load fixture into local storage
  })

  it('should display tasks from local storage', () => {
      
  })

  it('should persist new task after reload', () => {
      
  })
})