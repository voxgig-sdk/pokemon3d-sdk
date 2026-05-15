package core

type Pokemon3dError struct {
	IsPokemon3dError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPokemon3dError(code string, msg string, ctx *Context) *Pokemon3dError {
	return &Pokemon3dError{
		IsPokemon3dError: true,
		Sdk:              "Pokemon3d",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *Pokemon3dError) Error() string {
	return e.Msg
}
