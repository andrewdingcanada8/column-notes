import { useState, useEffect } from "react"
import classes from "./SandBox.module.css"

const SandBox = (props) => {
  const [loading, setLoading] = useState(true)
  const [dogs, setDogs] = useState([])
  const [renders, setRenders] = useState(0)
  useEffect(() => {
    setRenders(renders + 1)
  }, [loading, dogs])

  useEffect(() => {
    if (loading) {
      const fetchData = async () => {
        await new Promise(resolve => { setTimeout(() => resolve(), 1000) })

        const res = await fetch('https://dog.ceo/api/breed/hound/images/random/3')
        const json = await res.json()
        setDogs(json?.message)
        setLoading(false)
      }
      fetchData()
    } else {
      const timer = new Promise(resolve => { setTimeout(() => resolve(), 5000) })
        .then(() => setLoading(true))
    }


  }, [loading]) //empty to only run when mounted

  return (
    <div className={classes.SandBox}>
      {
        loading ?
          (<p>{'Loading...'}</p>)
          :
          dogs.map(dog => <img src={dog}/>)
      }
      <p>
        {'total rerenders: ' + renders}
      </p>
    </div>
  )
}

export default SandBox