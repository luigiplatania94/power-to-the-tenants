using PtttApi.Db.Entities;
using PtttApi.Domain;
namespace PtttApi.Repositories;


public interface IRoomieRepository
{
    Task<RoomieEntity> GetRoomieById(Guid id);
    Task<List<RoomieEntity>> GetAllRoomies();
    Task<RoomieEntity> CreateRoomie(CreateRoomieDTO roomie);
    Task<RoomieEntity> UpdateRoomie(Guid id, UpdateRoomieDTO dto);
    Task DeleteRoomie(Guid id);
}