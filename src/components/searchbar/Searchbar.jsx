
const Searchbar = ({setQuery}) => {

  const handleInputChange = event => {
    setQuery(event.target.value)
  }

  return (
    <form class="form-outline searchbar">
      <input type="search" name="query" class="form-control" placeholder="Search" aria-label="Search" onChange={handleInputChange} />
    </form>
  )
}

export default Searchbar
