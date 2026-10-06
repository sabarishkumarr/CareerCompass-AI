package com.careercompass.repository;
import com.careercompass.model.StudentInternship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface StudentInternshipRepository extends JpaRepository<StudentInternship, Long> {
    List<StudentInternship> findByStudentId(Long studentId);
}
