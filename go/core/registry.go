package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewPokemonEntityFunc func(client *Pokemon3dSDK, entopts map[string]any) Pokemon3dEntity

