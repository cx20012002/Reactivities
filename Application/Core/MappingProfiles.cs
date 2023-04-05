using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // CreateMap<Source, Destination>();
        CreateMap<Domain.Activity, Activity>();
    }
}