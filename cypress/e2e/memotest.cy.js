
const URL = "192.168.0.245:8080"

context('Memotest', () => {
  before(() => {
    cy.visit(URL);
  });

  describe('juega al memotest', () => {
    const numeroBanderas = 16;

    it('Se asegura que haya un tablero con 16 caudros boca abajo', () => {
      cy.get("#pantalla-de-juego").find('.img-thumbnail').should('have.length', numeroBanderas);
      cy.get("#pantalla-de-juego").find('.img-thumbnail').should('have.attr', 'src')
        .and('contain', 'back.jpg')
    })

    it('Se asegura que las banderas sean aleatorias', () => {
      cy.get('#boton-empezar-juego').click()
      cy.get("#pantalla-de-juego").find('.img-thumbnail').then((banderas) => {
        let banderasOriginales = [];
        banderas.each(function (i, bandera) {
          banderasOriginales.push(bandera.name)
        });

        cy.visit(URL);

        cy.get('#boton-empezar-juego').click()
        cy.get("#pantalla-de-juego").find('.img-thumbnail').then((banderas) => {
          let banderasNuevas = [];
          banderas.each(function (i, bandera) {
            banderasNuevas.push(bandera.name)
          });

          cy.wrap(banderasOriginales).should('not.deep.equal', banderasNuevas)
        })
      })
    })

    describe('Resuelve el juego', () => {
      let mapaDePares, listaDePares;
      it('Selecciona un par incorrecto', () => {
        cy.get('#pantalla-de-juego').find('.img-thumbnail').then(banderas => {
          mapaDePares = obtenerParesDeBanderas(banderas);
          listaDePares = Object.values(mapaDePares);

          cy.get(listaDePares[0][0]).click();
          cy.wait(700)
          cy.get(listaDePares[1][0]).click();
          
          cy.get(listaDePares[0][0]).should('have.attr', 'src').and('contain', 'back.jpg')
          cy.get(listaDePares[1][0]).should('have.attr', 'src').and('contain', 'back.jpg')
        })
      })

      it('Termina el juego', () => {
        listaDePares.forEach(par => {
          cy.get(par[0]).click();
          cy.wait(710)
          cy.get(par[1]).click();
          cy.wait(710)
        })
      })

      it('Muestra pantalla final', () => {
        cy.get('#resultados').should('be.visible').contains('¡Bien hecho! ¡Has ganado!')
        const numeroDeTurnos = numeroBanderas / 2 + 1
        cy.get('#intentos-finales').contains(numeroDeTurnos)
      })
    })
  })

  describe('Comienza un juego nuevo', () => { 
    it('Aprieta comenzar juego nuevo', () => { 
      cy.get('#boton-empezar-juego').click();
    })
  })
})



function obtenerParesDeBanderas(banderas) {
  const pares = {}

  banderas.each((i, bandera) => {
    const banderaDePais = bandera.name

    if (pares[banderaDePais]) {
      pares[banderaDePais].push(bandera)
    } else {
      pares[banderaDePais] = [bandera]
    }
  })

  return pares;
}
