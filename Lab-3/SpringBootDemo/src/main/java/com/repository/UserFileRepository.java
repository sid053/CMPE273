package com.repository;

import com.entity.Files;

import com.entity.Userfiles;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface UserFileRepository extends CrudRepository<Userfiles, Long> {


}
