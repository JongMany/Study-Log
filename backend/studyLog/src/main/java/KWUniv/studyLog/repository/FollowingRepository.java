package KWUniv.studyLog.repository;

import KWUniv.studyLog.entity.Following;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
public class FollowingRepository {

    @Autowired
    EntityManager em;


    public void save(Following following) {
        em.persist(following);
    }

}
