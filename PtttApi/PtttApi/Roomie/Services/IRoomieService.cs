using PtttApi.Domain;
namespace PtttApi.Services;

public interface IRoomieService
{
    Task<Roomie> GetRoomieById(Guid id);
    Task<List<Roomie>> GetAllRoomies();
    Task<Roomie> CreateRoomie(CreateRoomieDTO dto);
    Task DeleteRoomie(Guid id);
    Task<Roomie> UpdateRoomie(Guid id, UpdateRoomieDTO dto);
}