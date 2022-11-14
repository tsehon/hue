class SearchItem {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
    toString() {
        return this.name;
    }
    setType(type) {
        this.type = type;
    }
}

export default SearchItem;