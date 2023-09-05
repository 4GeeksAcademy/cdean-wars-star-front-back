import axios from "axios";
import { useNavigate } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			details: [],
			Planets: [],

			favoritos: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			], 

			characters: []
			,

			vehiculos: [],
			auth: false

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			signup: async (email, password) => {
				try {
					let data = await axios.post('https://special-journey-wg94xqrvppr2vjw4-3000.app.github.dev/signup',{
						"email":email,
						"password":password
					})
					alert(data.data.msg)
					return true;
				} catch (error) {
					console.log("errorrrrr:" + error)
					if (error.response.status === 404) {
						alert(error.response.data.msg)
					}
					return false;
				}

			},
			login: async (email, password) => {
				try {
					let data = await axios.post('https://special-journey-wg94xqrvppr2vjw4-3000.app.github.dev/login',{
						"email":email,
						"password":password
					})
					console.log(data);
					localStorage.setItem("token", data.data.access_token);
					setStore({auth:true})
					return true;
				} catch (error) {
					console.log("errorrrrr:" + error)
					if (error.response.status === 404) {
						alert(error.response.data.msg)
					}
					return false;
				}


			},

			validToken: async () => {
				let token = localStorage.getItem("token")
				try {
					let data = await axios.get('https://special-journey-wg94xqrvppr2vjw4-3000.app.github.dev/valid-token',{
						"headers":{'Authorization': 'Bearer '+token}
					})
					console.log(data);
					setStore({auth:true})
					return true;
				} catch (error) {
					console.log("errorrrrr:" + error)
					if (error.response.status === 401) {
						setStore({auth:false})
						alert(error.response.data.msg)
					}
					return false;
				}


			},
			logout: (navigate) => {
				console.log("Funciona")
				localStorage.removeItem("token")
				setStore({auth:false})
				navigate('/login')
			},

			obtenerFavUser: async () => {
				let token = localStorage.getItem("token")
				try {
					let data = await axios.get('https://special-journey-wg94xqrvppr2vjw4-3000.app.github.dev/user/fav',{
						"headers":{'Authorization': 'Bearer '+token}
					});
					console.log(data.data.results)
					setStore({favoritos:data.data.results})
					return true;
				} catch (error) {
					console.log("errorrrrr:" + error)
					if (error.response.status === 401) {
						setStore({auth:false})
						alert(error.response.data.msg)
					}
					return false;
				}


			},
			
			obtenerVehiculosClaudia: async () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				try {
					let response = await fetch("https://swapi.dev/api/vehicles", {
						method: "GET"
					});

					let data = await response.json();
					console.log(data.results);
					setStore({ vehiculos: data.results });


				} catch (error) {
					console.log(error)
				}

			},

			obtenerPersonajes: async () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/

				try {
					let response = await fetch("https://swapi.dev/api/people"); //especificamos la url donde vamos a buscar info
					let data = await response.json()
					console.log(data);
					setStore({characters: data.results})
					
				} catch (error) {
					console.log(error)
					
				}
			},
			obtenerplanetas: async function () {
				//accion, funcion que puedo volver a utilizar cuando quiera
				try {
					let response = await fetch("https://swapi.dev/api/planets"); //esto me regresa una respuesta, que la guerdo en un espacio de memoira
					//le digo que espere por esa respuesta
					let data = await response.json(); //le digo que convierta esa respuesta en un jason y lo guardo en un espacio de memoira y que espere por la convercion de esa respuesta
					console.log(data);
					setStore({ Planets: data.results }); //({propiedad:el valor que quiero actuaizar})
				} catch (error) {
					console.log(error);
				}
			},
			agregarFavorito: (name) => {
				
			
				setStore({ favoritos: [...getStore().favoritos, name] });
								
					
			
			},
			eliminarFavorito:(name)=>{
				const arr= getStore().favoritos.filter((name2)=>
				name2!==name)
				setStore({ favoritos: arr});
				
			},
			getDetails: async (type, id) => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/

				if (type !== "characters") {
					const data = await fetch("https://swapi.dev/api/" + type + "/" + id);
					const response = await data.json();
					setStore({ details: response })
				} else {
					const data = await fetch("https://swapi.dev/api/people/" + id);
					const response = await data.json();
					setStore({ details: response })
				}



			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;





