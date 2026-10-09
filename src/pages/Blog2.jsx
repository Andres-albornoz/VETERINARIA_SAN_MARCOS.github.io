import placeholder from '../assets/placeholder.png';
function Blog2() {
  return (
    <>
      <div className="encabezado">Caso Clínico: La historia de Marcos y el origen de nuestra vocación</div>

      <div className="box-text">
        (texto de ejemplo)
        <br />
        Hay pacientes que dejan una huella imborrable y cambian el rumbo de una vida entera.
        <br />
        Para nosotros, ese paciente fue Marcos: un perro mestizo que no solo nos enseñó el verdadero
        valor de la medicina veterinaria, sino que se convirtió en la inspiración detrás de la
        fundación de Veterinaria San Marcos.
      </div>

      <img className="nosotros-img" src={placeholder} alt="placeholder" />
    </>
  );
}

export default Blog2;
