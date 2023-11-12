using PtttApi.Db.Entities;
using PtttApi.Domain;

namespace PtttApi.Attribute.Repository;

public class TraitListRepository : ITraitListRepository
{
    public Task<bool> UpdateRoomieAttributes(List<Trait> attributes, Roomie roomie)
    {
        throw new NotImplementedException();
    }
}