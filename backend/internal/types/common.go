package types

type Pagination struct {
	Page string `json:"page"`
	Size string `json:"size"`
}

type QueryOptions struct {
	Pagination
}

type MetadataType struct {
	QueryOptions
	Total int `json:"total"`
}

type ResponseType struct {
	Data     any          `json:"data"`
	Metadata MetadataType `json:"metadata"`
}
