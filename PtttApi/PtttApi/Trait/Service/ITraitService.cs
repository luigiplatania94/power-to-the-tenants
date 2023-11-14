using PtttApi.Domain;
using PtttApi.Trait.DTOs;

namespace PtttApi.Trait.Service;

public interface ITraitService
{
    Task<Roomie> UpdateRoomieTraits(List<string> traitNames, Guid Id);
    Task<List<Domain.Trait>> GetAllTraits();
}