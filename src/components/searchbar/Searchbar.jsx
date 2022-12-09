
const Searchbar = ({setQuery}) => {

  const handleInputChange = event => {
    setQuery(event.target.value)
  }

  return (
    <form className="form-outline searchbar">
      <input type="search" name="query" className="form-control" placeholder="Search" aria-label="Search" onChange={handleInputChange} />
    </form>
  )
}

export default Searchbar
