export default class ChartData {
    // refer to spreadsheet for types, assume string if not specified
    // order is important
    artistKey: string;
    albumLetter: string;
    labelId: string; // can be null(if indie)
    name: string;
    dateAdded: string; // Date is a type that could be used here
    missing: boolean;
    isNew: boolean;
    promoterId: string;
    formatCode: string; // hex/binary code

    // Constructor that sets all default values
    constructor( artistKey, albumLetter, labelId, name, dateAdded, missing, isNew, promoterId, formatCode ) {
        this.artistKey = artistKey;
        this.albumLetter = albumLetter;
        this.labelId = labelId;
        this.name = name;
        this.dateAdded = dateAdded;
        this.missing = missing;
        this.isNew = isNew;
        this.promoterId = promoterId;
        this.formatCode = formatCode;
    }
}
