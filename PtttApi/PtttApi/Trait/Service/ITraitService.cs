using PtttApi.Domain;
using PtttApi.Trait.DTOs;

namespace PtttApi.Trait.Service;

public interface ITraitService
{
    Task<Roomie> UpdateRoomieTraits(List<UpdateRoomieTraitDTO> updateRoomieTraitsDTO, Guid Id);
    Task<List<Domain.Trait>> GetAllTraits();
}