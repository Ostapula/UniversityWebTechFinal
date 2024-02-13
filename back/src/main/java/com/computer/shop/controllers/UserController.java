package com.computer.shop.controllers;

import com.computer.shop.models.dto.ChangeUserDataDTO;
import com.computer.shop.models.dto.ErrorMessageDTO;
import com.computer.shop.models.dto.RegistrationDTO;
import com.computer.shop.models.order.OrderIdDTO;
import com.computer.shop.models.workshop.WorkshopDTO;
import com.computer.shop.services.OrderService;
import com.computer.shop.services.UserService;
import com.computer.shop.services.WorkshopService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
public class UserController {

    private final OrderService orderService;

    private final UserService userService;

    private final WorkshopService workshopService;

    public UserController(OrderService orderService, UserService userService, WorkshopService workshopService) {
        this.orderService = orderService;
        this.userService = userService;
        this.workshopService = workshopService;
    }

    @GetMapping
    public ResponseEntity<?> userTest() {
        ErrorMessageDTO messageDTO = new ErrorMessageDTO();
        messageDTO.setMessage("Hello, World! User controller!");
        return new ResponseEntity<>(messageDTO, HttpStatus.OK);
    }

    @PostMapping("/order/{id}")
    public ResponseEntity<?> order(@RequestBody OrderIdDTO body, @PathVariable Long id) {
        return orderService.newOrder(id, body.getComputerCase(), body.getMotherboard(), body.getGpu(), body.getCpu(), body.getRam(), body.getHardMemory(), body.getPowerSupply(), body.getCooler(), body.getSum());
    }

    @GetMapping("/get-user-orders/{id}")
    public ResponseEntity<?> getUserOrders(@PathVariable Long id) {
        return userService.getUserOrders(id);
    }

    @PutMapping("/change-user-data/{id}")
    public ResponseEntity<?> changeUserInformation(@RequestBody ChangeUserDataDTO body, @PathVariable Long id) {
        return userService.changeUserDetails(id, body.getUsername(), body.getName(), body.getEmail(),  body.getAddress(), body.getPostalcode(), body.getCity(), body.getPhone());
    }

    @GetMapping("/get-user-workshop/{id}")
    public ResponseEntity<?> getUserWorkshop(@PathVariable Long id) {
        return userService.getUserWorkshop(id);
    }

    @PostMapping("/workshop/{id}")
    public ResponseEntity<?> workshop(@RequestBody WorkshopDTO body, @PathVariable Long id) {
        return workshopService.newWorkshop(body.getDate(), body.getTime(), body.getService(), body.getDescription(), id);
    }

    @DeleteMapping("/cancel-workshop/{id}")
    public ResponseEntity<?> cancelWorkshop(@PathVariable Long id) {
        return userService.cancelWorkshop(id);
    }
}
