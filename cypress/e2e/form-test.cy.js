

describe('My First Test', () => {
    beforeEach(() => {
        cy.visit("/");
    })
    it('Isim Alani testi', () => {
        cy.get('[data-cy="isim-input"]').type("Kobe Byrant")
        .should("have.value", "Kobe Byrant")
        .clear()
        cy.get('[data-cy="isim-input"]').type("Lebron James")
        .should("have.class", "is-valid");
    })
    it('Email Alani testi', () => {
        cy.get('[data-cy="email-input"]').type("email@email.com")
        .should("have.value", "email@email.com")
        .clear()
        cy.get('[data-cy="email-input"]').type("email@email.com")
        .should("have.class", "is-valid");
    })
    it('Sifre Alani testi', () => {
        cy.get('[data-cy="password-input"]').type("sifreTest1324")
        .should("have.value", "sifreTest1324")
        .clear()
        cy.get('[data-cy="password-input"]').type("sifreTest1324")
        .should("have.class", "is-valid");
    })
    it('Sifre Kontrol Alani testi', () => {
        cy.get('[data-cy="password_control-input"]').type("sifreTest1324")
        .should("have.value", "sifreTest1324")
        .clear()
        cy.get('[data-cy="password-input"]').type("sifreTest1324")
        cy.get('[data-cy="password_control-input"]').type("sifreTest1324")
        .should("have.class", "is-invalid");
    })
    it('Kullanici Kabul Kontrol Alani testi', () => {
        cy.get('[data-cy="terms-input"]').click("right")
        .should("be.checked")
        .click("right")
        .should("not.be.checked")
    })
    it('Kullanici Kabul Kontrol Alani testi', () => {
        cy.get('[data-cy="kayit_tipi-input"]').select(2).select(3)
        .should("have.value", "Uyelik Yenileme");
    })
    it('Form Eksikken Buton Kontrol Alani testi', () => {
        cy.get('[data-cy="isim-input"]').type("Elon Musk");
        cy.get('[data-cy="email-input"]').type("elonmusk@tesla.com");
        cy.get('[data-cy="password-input"]').type("twitterrocks99");
        cy.get('[data-cy="password_control-input"]').type("twitterrocks99");
        // cy.get('[data-cy="terms-input"]').click("right"); //Checkbox bos birakilarak hatali form gonderildi
        cy.get('[data-cy="kayit_tipi-input"]').select(2);
        cy.get('[data-cy="submit-button"]').should("be.disabled");
    })
    it('Eksiksiz Form Buton Kontrol testi', () => {
        cy.get('[data-cy="isim-input"]').type("Elon Musk");
        cy.get('[data-cy="email-input"]').type("elonmusk@tesla.com");
        cy.get('[data-cy="password-input"]').type("twitterrocks99");
        cy.get('[data-cy="password_control-input"]').type("twitterrocks99");
        cy.get('[data-cy="terms-input"]').click("right");
        cy.get('[data-cy="kayit_tipi-input"]').select(2);
        cy.get('[data-cy="submit-button"]').should("be.enabled");
    })
    it('Eksiksiz Form Buton Kontrol testi', () => {
        cy.get('[data-cy="isim-input"]').type("Elon Musk");
        cy.get('[data-cy="email-input"]').type("elonmusk@tesla.com");
        cy.get('[data-cy="password-input"]').type("twitterrocks99");
        cy.get('[data-cy="password_control-input"]').type("twitterrocks99");
        cy.get('[data-cy="terms-input"]').click("right");
        cy.get('[data-cy="kayit_tipi-input"]').select(2);
        cy.get('[data-cy="submit-button"]').click().then(()=>{   
            cy.get('[data-cy="uye-karti"]').should("be.visible");
        }
            )
    })
    it('Iki uye ekleyip ikisini de ekranda gorme Kontrol testi', () => {
        cy.get('[data-cy="isim-input"]').type("Elon Musk");
        cy.get('[data-cy="email-input"]').type("elonmusk@tesla.com");
        cy.get('[data-cy="password-input"]').type("twitterrocks99");
        cy.get('[data-cy="password_control-input"]').type("twitterrocks99");
        cy.get('[data-cy="terms-input"]').click("right");
        cy.get('[data-cy="kayit_tipi-input"]').select(2);
        cy.get('[data-cy="submit-button"]').click().then(()=>{   
            cy.get('[data-cy="isim-input"]').type("Jet Fadil");
        cy.get('[data-cy="email-input"]').type("fadil@ponzi.com");
        cy.get('[data-cy="password-input"]').type("gelsinparalar");
        cy.get('[data-cy="password_control-input"]').type("gelsinparalar");
        cy.get('[data-cy="terms-input"]').click("right");
        cy.get('[data-cy="kayit_tipi-input"]').select(3);
        cy.get('[data-cy="submit-button"]').click();
        cy.get('[data-cy="uye-karti"]').should("have.length", 2)
        }
            )
    })
})
