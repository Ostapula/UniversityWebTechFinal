package com.computer.shop;

import com.computer.shop.models.shopitems.*;
import com.computer.shop.models.user.Role;
import com.computer.shop.models.user.User;
import com.computer.shop.repository.RoleRepository;
import com.computer.shop.repository.UserRepository;
import com.computer.shop.repository.shopitemsrepository.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class ComputersApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComputersApplication.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder,
						  ComputerCaseRepository computerCaseRepository, MotherboardRepository motherboardRepository,
						  GPURepository gpuRepository, CPURepository cpuRepository, RAMRepository ramRepository, HardMemoryRepository hardMemoryRepository,
						  PowerSupplyRepository powerSupplyRepository, CoolerRepository coolerRepository) {
		return args -> {
			if (roleRepository.findByAuthority("ADMIN").isPresent()) return;
			Role adminRole = roleRepository.save(new Role("ADMIN"));
            roleRepository.save(new Role("USER"));

            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);

            User admin = new User("admin","Ostap Zabanzhalo", "ostapnote2@gmail.com", passwordEncoder.encode("admin"),
					"Mikolajczyka 16/6", "35-200", "Rzeszow", "+48789697966", roles);

            userRepository.save(admin);

			String jsonFilePath = "C:/pyProjects/final-proj/shop/computercases.json";
			Gson gson = new Gson();
			try (Reader reader = Files.newBufferedReader(Paths.get(jsonFilePath))) {
				List<ComputerCase> items = gson.fromJson(reader, new TypeToken<List<ComputerCase>>(){}.getType());
				computerCaseRepository.saveAll(items);
			}
			String jsonFilePath2 = "C:/pyProjects/final-proj/shop/motherboard.json";
			try (Reader reader = Files.newBufferedReader(Paths.get(jsonFilePath2))) {
				List<Motherboard> items = gson.fromJson(reader, new TypeToken<List<Motherboard>>(){}.getType());
				motherboardRepository.saveAll(items);
			}
			String jsonFilePath3 = "C:/pyProjects/final-proj/shop/gpu.json";
			try (Reader reader = Files.newBufferedReader(Paths.get(jsonFilePath3))) {
				List<GPU> items = gson.fromJson(reader, new TypeToken<List<GPU>>(){}.getType());
				gpuRepository.saveAll(items);
			}
			String jsonFilePath4 = "C:/pyProjects/final-proj/shop/cpu.json";
			try (Reader reader = Files.newBufferedReader(Paths.get(jsonFilePath4))) {
				List<CPU> items = gson.fromJson(reader, new TypeToken<List<CPU>>(){}.getType());
				cpuRepository.saveAll(items);
			}
			String jsonFilePath5 = "C:/pyProjects/final-proj/shop/ram.json";
			try (Reader reader = Files.newBufferedReader(Paths.get(jsonFilePath5))) {
				List<RAM> items = gson.fromJson(reader, new TypeToken<List<RAM>>(){}.getType());
				ramRepository.saveAll(items);
			}
			String jsonFilePath6 = "C:/pyProjects/final-proj/shop/memory.json";
			try (Reader reader = Files.newBufferedReader(Paths.get(jsonFilePath6))) {
				List<HardMemory> items = gson.fromJson(reader, new TypeToken<List<HardMemory>>(){}.getType());
				hardMemoryRepository.saveAll(items);
			}
			String jsonFilePath7 = "C:/pyProjects/final-proj/shop/powersupply.json";
			try (Reader reader = Files.newBufferedReader(Paths.get(jsonFilePath7))) {
				List<PowerSupply> items = gson.fromJson(reader, new TypeToken<List<PowerSupply>>(){}.getType());
				powerSupplyRepository.saveAll(items);
			}
			String jsonFilePath8 = "C:/pyProjects/final-proj/shop/cooler.json";
			try (Reader reader = Files.newBufferedReader(Paths.get(jsonFilePath8))) {
				List<Cooler> items = gson.fromJson(reader, new TypeToken<List<Cooler>>(){}.getType());
				coolerRepository.saveAll(items);
			}
		};
	}
}
