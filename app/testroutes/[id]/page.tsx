
type Params = {
  params: {
    id: string
  }
}

export default async function DynamicTest({ params: { id }}: Params)  {
  console.log(id);


  return (

  <p>Coucou de {id}</p>
   )
}