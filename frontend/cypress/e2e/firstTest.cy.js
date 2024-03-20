describe('Frontend Tests', () => {
  it('Hut_Finder URL Live', () => {
    cy.visit('/')
    

  })
  it('Contact Page live ', () => {
    cy.visit('/#contact_us')
    

  })
  it('Browse Page live ', () => {
    cy.visit('/browse')
    
  })
  
  it('Landlord Login live ', () => {
    cy.visit('/auth/signin/landlord')
    
  })
  it('Client Login live ', () => {
    cy.visit('/auth/signin/client')
    
  })

  it('Landlord Signup live ', () => {
    cy.visit('/auth/signup/landlord')
    
  })
  it('Client Signup live ', () => {
    cy.visit('/auth/signup/client')
    
  })
  

})
//describe('Backend API Tests', () => {
//  it('should return 200 OK from /api/endpoint', () => {
//    cy.visit('GET', 'http://localhost:2000/api')
//      
//  })
//})

//
//describe('Visit URL', () => {
//  it('should visit http://localhost:5173/', () => {
//    // Visit the URL
//    cy.visit('http://localhost:5173/')
//
//    // Optionally, you can add assertions to ensure elements or behavior on the page
//    // For example, you can assert the title of the page
//    cy.title().should('include', 'Your Page Title') // Replace 'Your Page Title' with the actual title of your page
//  })
//})
