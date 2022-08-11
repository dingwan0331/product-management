const timeTranslator = (time) => {
    return time.toISOString().replace('Z','')
}

module.exports = { timeTranslator }