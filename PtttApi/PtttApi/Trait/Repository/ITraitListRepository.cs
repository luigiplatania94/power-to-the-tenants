using PtttApi.Db.Entities;

namespace PtttApi.Trait.Repository;

public interface ITraitListRepository
{
    Task<RoomieEntity> UpdateRoomieTraits(List<Domain.Trait> traits, Guid roomieId);
}