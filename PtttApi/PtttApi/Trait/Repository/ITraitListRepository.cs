using PtttApi.Db.Entities;
using PtttApi.Trait.DTOs;

namespace PtttApi.Trait.Repository;

public interface ITraitListRepository
{
    Task<RoomieEntity> UpdateRoomieTraits(List<UpdateRoomieTraitDTO> updateRoomieTraitsDTO, Guid roomieId);
}