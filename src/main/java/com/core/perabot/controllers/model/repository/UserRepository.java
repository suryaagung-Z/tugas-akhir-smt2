package com.core.perabot.controllers.model.repository;

import com.core.perabot.controllers.model.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
