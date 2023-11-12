using PtttApi.Domain;

namespace PtttApi.Attribute.Repository;

public interface ITraitListRepository
{
    Task<bool> UpdateRoomieAttributes(List<Trait> attributes, Roomie roomie);
}