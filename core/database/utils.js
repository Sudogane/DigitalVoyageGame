function handleQuery(query) {
  if (["string", "number"].includes(typeof query)) query = { id: query }
  return query
}

module.exports = {
  dbGet(query, project = { _id: 0 }) {
    query = handleQuery(query)
    
    return new Promise((resolve) => {
      return this.findOne(query, project).lean().then((data) => {
        resolve(data)
      })
    })
  },
  
  dbSet(query, alteration, options = {}) {
    query = handleQuery(query)
    
    return new Promise((resolve) => {
      if (!alteration) resolve(null)
      if (!options.upsert) options.upsert = true

      return resolve(this.updateOne(query, alteration, options).lean().exec())
    })
  }
}