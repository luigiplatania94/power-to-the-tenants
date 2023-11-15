using PtttApi.Domain;
using PtttApi.Trait.DTOs;
using PtttApi.Trait.Repository;

namespace PtttApi.Trait.Service;

public class TraitService : ITraitService
{
    private readonly ITraitRepository _traitRepository;
    private readonly ITraitListRepository _traitListRepository;

    public TraitService(ITraitRepository traitRepository, ITraitListRepository traitListRepository)
    {
        _traitRepository = traitRepository;
        _traitListRepository = traitListRepository;
    }


    public async Task<Roomie> UpdateRoomieTraits(List<string> traitNames, Guid id)
    {
        return new Roomie(await _traitListRepository.UpdateRoomieTraits(traitNames,id));
    }
    
    public async Task<List<Domain.Trait>> GetAllTraits()
    {
        var traitEntities = await _traitRepository.GetAllTraits();
        return traitEntities.Select(re => new Domain.Trait(re)).ToList();
    }
}