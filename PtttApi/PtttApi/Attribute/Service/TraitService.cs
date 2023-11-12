using PtttApi.Attribute.Repository;
using PtttApi.Domain;

namespace PtttApi.Attribute.Service;

public class TraitService : ITraitService
{
    private readonly ITraitRepository _traitRepository;

    public TraitService(ITraitRepository traitRepository)
    {
        _traitRepository = traitRepository;
    }


    public async Task<bool> UpdateRoomieAttributes(List<Trait> traits, Roomie roomie)
    {
        throw new NotImplementedException();
    }

    public async Task<List<Trait>> GetAllAttribute()
    {
        var traitEntities = await _traitRepository.GetAllAttribute();
        return traitEntities.Select(re => new Trait(re)).ToList();
    }
}