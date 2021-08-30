import { useState } from "react";

export default function Checkout(props) {
  // useState for if the user decides to choose a time to get his food
  const [timp, setTimp] = useState(false);

  const ChooseHour = () => {
    return (
      <input
        className="ms-4"
        id="alege"
        type="time"
        name="timp"
        min="09:00"
        max="23:00"
      />
    );
  };

  return (
    <>
      <section className="container-fluid h-100 bg-white">
        <form className="p-5 fs-5 shadow bg-body rounded me-5 ms-5">
          <h3>Adresa de livrare:</h3>
          <label className="me-5 mt-4" htmlFor="prenumeInput">
            Prenume *<br></br>
            <input
              className="fs-4"
              id="prenumeInput"
              type="text"
              name="prenume"
              required
            />
          </label>
          <label className="me-5 mt-4" htmlFor="numeInput">
            Nume *<br></br>
            <input
              className="fs-4"
              id="numeInput"
              type="text"
              name="nume"
              required
            />
          </label>
          <label className="me-5 mt-4" htmlFor="adresaInput">
            Adresa * <br></br>
            <input
              className="fs-4"
              id="adresaInput"
              type="text"
              name="adresa"
              placeholder="Nume strada, numar etc."
              required
            />
          </label>
          <label className="me-5 mt-4" htmlFor="orasInput">
            Oras * <br></br>
            <input
              className="fs-4"
              id="orasInput"
              type="text"
              name="oras"
              required
            />
          </label>
          <label className="me-5 mt-4" htmlFor="telefonInput">
            Telefon * <br></br>
            <input
              className="fs-4"
              id="telefonInput"
              type="tel"
              name="telefon"
              required
            />
          </label>
          <label className="mt-4" htmlFor="emailInput">
            E-mail * <br></br>
            <input
              className="fs-4"
              id="emailInput"
              type="text"
              name="e-mail"
              required
            />
          </label>
          <br></br>
          <p className="mt-3">Cand se va face livrarea / servirea? *</p>
          <div className="mt-2 mb-2">
            <input
              type="radio"
              id="catMaiRepede"
              name="timp"
              onClick={() => setTimp(false)}
              defaultChecked
            />
            <label className="ms-2 me-5" htmlFor="catMaiRepede">
              Cat mai repede
            </label>
            <input
              type="radio"
              id="alege"
              name="timp"
              onClick={() => setTimp(true)}
            />
            <label className="ms-2" htmlFor="alege">
              Alege ora!
            </label>
            {timp ? <ChooseHour /> : null}
          </div>
          <p className="mb-1">Metoda de livrare</p>
          <div>
            <input
              className="me-2"
              type="radio"
              id="livrareLaDomiciliu"
              name="livrarea"
              value="livrareLaDomiciliu"
              checked
            />
            <label htmlFor="livrareLaDomiciliu">Livrare la domiciliu</label>
          </div>
          <div>
            <input
              className="me-2"
              type="radio"
              id="ridicarePersonala"
              name="livrarea"
              value="ridicarePersonala"
            />
            <label htmlFor="ridicarePersonala">Ridicare personala</label>
          </div>
          <input type="checkbox" id="datele" name="datele" value="true" />
          <label className="ms-2" htmlFor="datele">
            {" "}
            Pastreaza-mi datele pentru urmatoarea comanda
          </label>
          <br></br>
          <div className="d-inline-flex">
            <input
              className="mt-2"
              type="checkbox"
              id="conditiile"
              name="conditiile"
              value="true"
              required
            />
            <label className="ms-2" htmlFor="conditiile">
              {" "}
              Confirm ca am citit Termenii si conditiile care contin toate
              informatiile referitoare la modul de procesare a datelor cu
              carater personal necesare pentru procesarea si executarea
              comenzilor si declar ca sunt de acord cu acesti termeni si
              conditii. In cazul comenzilor nelivrate, suma va fi returnata pe
              acelasi card utilizat la tranzactionare, in decurs de 14 zile de
              la acceptarea returului, in functie de banca emitenta a cardului.
              *
            </label>
            <br></br>
          </div>
          <input type="checkbox" id="cont" name="cont" value="true" />
          <label className="ms-2" htmlFor="cont">
            {" "}
            Creezi un cont?
          </label>
          <br></br>
          <h2 className="mt-4 mb-4">Comanda ta</h2>
          <div className="d-inline-flex mb-3">
            <p>2 X</p>
            <p className="ms-5"> Pizza medieval mare</p>
            <p className="ms-5">20.00 lei</p>
          </div>
          <p className="border-top border-2 fs-3">
            Total: <strong>20.00lei</strong>
          </p>
          <button className="container black-bg text-white border border-2 border-dark rounded p-2">
            PLASEAZA COMANDA
          </button>
        </form>
      </section>
    </>
  );
}
