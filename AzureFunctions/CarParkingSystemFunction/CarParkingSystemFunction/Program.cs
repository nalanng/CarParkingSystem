using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using CarParkingSystem.Infrastructure.Contexts;
using CarParkingSystem.Infrastructure.Services;
using CarParkingSystem.Core.Interfaces;
using Azure.Messaging.ServiceBus;
using Microsoft.EntityFrameworkCore;
using CarParkingSystemFunction;
using Microsoft.Extensions.Configuration;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureAppConfiguration(config =>
    {
        config.SetBasePath(Directory.GetCurrentDirectory());
        config.AddJsonFile("local.settings.json", optional: true, reloadOnChange: true);
        config.AddEnvironmentVariables();
    })
    .ConfigureServices((context, services) =>
    {
        var configuration = context.Configuration;
        var serviceBusConnectionString = configuration["ServiceBusConnectionString"];

        services.AddSingleton(new ServiceBusClient(serviceBusConnectionString)); 

        var defaultConnection = configuration.GetConnectionString("DefaultConnection") ?? configuration["DefaultConnection"];
        if (defaultConnection == null)
        {
            Console.WriteLine("DefaultConnection is null");
            throw new InvalidOperationException("DefaultConnection is not configured properly.");
        }

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(defaultConnection);
        });

        services.AddScoped<CarParkingSystemServices>();
        services.AddScoped<IDateTimeService, DateTimeService>();
    })
    .Build();

host.Run();
