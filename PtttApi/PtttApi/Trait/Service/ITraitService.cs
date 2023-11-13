using PtttApi.Domain;

namespace PtttApi.Trait.Service;

public interface ITraitService
{
    Task<Roomie> UpdateRoomieTraits(List<Domain.Trait> traits, Guid Id);
    Task<List<Domain.Trait>> GetAllTraits();
}