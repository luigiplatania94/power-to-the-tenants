using PtttApi.Domain;

namespace PtttApi.Attribute.Service;

public interface ITraitService
{
    Task<bool> UpdateRoomieAttributes(List<Trait> traits, Roomie roomie);
    Task<List<Trait>> GetAllAttribute();
}