import {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const AgregarProductos = () => {
const [formData, setFormData] = useState({
    nombre: "",
    precio: 0,
    descripcion: "",
    talla: "",
    estado: "",
    imagen: "",
    genero_dirigido: "",
    id_categoria: 0
});

const [mensaje, setMesaje] = useState("");  // Mensaje de éxito o error 

const navigate = useNavigate();  // Para redirigir al usuario   

//Para tomar los datos del cambio del formulario en el momento 
const handleChane = (e) => {
    const { name, value} = e.target;
    setFormData({ ...formData, [name]: value});
};

 // Manejar el envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recargar la página
}

    try {
        constqw
    }

}
export default AgregarProductos