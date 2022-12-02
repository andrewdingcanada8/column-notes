import { useState, useEffect } from "react"
import classes from "./SandBox.module.css"

const SandBox = (props) => {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [renders, setRenders] = useState(0)
  useEffect(() => {
    setRenders(renders + 1)
  }, [loading, message])

  useEffect(() => {
    if (loading) {
      const fetchData = async () => {
        await new Promise(resolve => { setTimeout(() => resolve(), 1000) })

        const res = await fetch('https://api.adviceslip.com/advice')
        // const res = await fetch('https://dog.ceo/api/breed/hound/images/random/3')
        const json = await res.json()
        setMessage(json?.slip?.advice)
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
          (<p>{message}</p>)
      }
      <p>
        {'total rerenders: ' + renders}
      </p>
    </div>
  )
}

export default SandBox