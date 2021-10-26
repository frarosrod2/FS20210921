package com.example.domains.contracts.services;

import com.example.domains.core.services.contracts.DomainService;
import com.example.domains.core.services.contracts.ProjectionDomainService;
import com.example.domains.entities.Film;
import com.example.domains.entities.FilmActor;
import com.example.domains.entities.FilmCategory;
import com.example.domains.entities.Inventory;
import com.example.domains.entities.Rental;

public interface RentalService extends DomainService<Rental, Integer>{

}
