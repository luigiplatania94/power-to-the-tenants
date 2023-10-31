using PtttApi.Db.Entities;
using PtttApi.Domain;
namespace PtttApi.Repositories;


public interface IRoomieRepository
{
    Roomie? GetRoomieById(Guid id);
    Task<List<RoomieEntity>> GetAllRoomies();
    void CreateRoomie(CreateRoomieModel roomie);
    void DeleteRoomie(Guid id);
}