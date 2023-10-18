using PtttApi.Domain;

namespace PtttApi.Repositories;

public class RoomieRepository : IRoomieRepository
{
    private List<Roomie> Roomies = new List<Roomie>
    {
        new Roomie
        {
            Id = new Guid("dda26589-e479-4864-b19e-70b7de9f750c"),
            ProfileImage = "https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMzR8MHwxfGFsbHwxfHx8fHx8fHwxNjE1OTU2MzM0&ixlib=rb-1.2.1&q=80&w=400",
            Description = "Lola is a playful pup who loves morning walks.",
            Attributes = new List<string> {"Friendly", "Loves toys", "Early Bird"},
        },
        new Roomie
        {
            Id = new Guid("b51fbdda-3c1f-4c15-9477-5da7d1f47d1a"),
            ProfileImage =
                "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            Description = "Wiskers is scared of big meanie mice",
            Attributes = new List<string> { "Scared", "Playful" },
        }
    };
    
    public Roomie? GetRoomieById(Guid id)
    {
        return Roomies
            .FirstOrDefault(r => r.Id == id); // LINQ first item in collection that matches this criteria or return null
    }
}